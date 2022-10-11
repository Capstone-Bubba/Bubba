package com.twogudak.bubba

import android.content.Intent
import android.media.Image
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.ImageButton
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.lifecycle.ViewModelProvider
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.common.SignInButton
import com.google.android.gms.tasks.Task
import com.google.firebase.messaging.FirebaseMessaging
import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.common.model.ClientError
import com.kakao.sdk.common.model.ClientErrorCause
import com.kakao.sdk.common.util.Utility
import com.kakao.sdk.user.UserApiClient
import com.navercorp.nid.NaverIdLoginSDK
import com.twogudak.bubba.HttpData.RespositoryManager.SendToken
import com.twogudak.bubba.SNSLogin.*
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.SplashViewModel
import com.twogudak.bubba.Ui.rootPage.rootActivty
import kotlinx.coroutines.*
import okhttp3.internal.wait
import kotlin.math.log

class MainActivity : AppCompatActivity() {

    //google_login_class
    private lateinit var GoogleSignResultLauncher:ActivityResultLauncher<Intent>
    private lateinit var mainViewModel: MainViewModel

    private val appSetting by lazy {
        ApplicationSetting(this)
    }


    //class 생성
    val google_login = Google_Login(this)
    val kakao_login = Kakao_Login_class(this)
    val naver_login = Naver_login(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mainViewModel = ViewModelProvider(this).get(MainViewModel::class.java)

        //Android Hash값 얻어오기 Kakao api 사용
        var keyHash = Utility.getKeyHash(this)
        Log.e("Android Hash",keyHash)

        //네아로 객체 초기화
        NaverIdLoginSDK.initialize(this,BuildConfig.naver_ClientID,BuildConfig.naver_Client_Secret,"bubba")

        //구글 버튼
        val google_login_button = findViewById<SignInButton>(R.id.google_login_button)
        google_login_button.setSize(SignInButton.SIZE_WIDE)

        //카카오톡 로그인 버튼
        val kakao_login_button = findViewById<ImageButton>(R.id.kakao_login_button)


        //네이버 로그인 버튼
        val naver_login_button = findViewById<Button>(R.id.naver_login_button)

        //GoogleActivityResultLauncher 구현
        GoogleSignResultLauncher = registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()){ result ->
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(result.data)
            google_login.handleSignInResult(task)
        }

        //setonClickListener 구현

        // 카카오톡이 설치되어 있으면 카카오톡으로 로그인, 아니면 카카오계정으로 로그인
        kakao_login_button.setOnClickListener {
            if (UserApiClient.instance.isKakaoTalkLoginAvailable(this)) {
                UserApiClient.instance.loginWithKakaoTalk(this) { token, error ->
                    if (error != null) {

                        // 사용자가 카카오톡 설치 후 디바이스 권한 요청 화면에서 로그인을 취소한 경우,
                        // 의도적인 로그인 취소로 보고 카카오계정으로 로그인 시도 없이 로그인 취소로 처리 (예: 뒤로 가기)
                        if (error is ClientError && error.reason == ClientErrorCause.Cancelled) {
                            return@loginWithKakaoTalk
                        }
                        // 카카오톡에 연결된 카카오계정이 없는 경우, 카카오계정으로 로그인 시도
                        UserApiClient.instance.loginWithKakaoAccount(this, callback = callback)
                    } else if (token != null) {
                        UserApiClient.instance.me { user, error ->
                            if(error != null){
                                Log.e("Kakao Account", "사용자 정보 요청 실패", error)
                            } else if (user != null) {
                                Log.i("Kakao Account", "사용자 정보 요청 성공+ ${user.kakaoAccount?.email}")
                                if (user.kakaoAccount?.email.isNullOrEmpty()){}else{
                                    Log.d("rootActivty",user.kakaoAccount?.email.toString())
                                    val email = user.kakaoAccount?.email.toString()
                                    mainViewModel.sendUserData("kakao",email).observe(this){
                                        Log.d("appid",it)
                                        if (it.isNotEmpty()){
                                            appSetting.setAppid(it)
                                            FirebaseMessaging.getInstance().token
                                                .addOnCompleteListener { task ->
                                                    if (!task.isSuccessful) {
                                                        Log.d("Firebase", "getInstanceId failed", task.exception)
                                                        return@addOnCompleteListener
                                                    }
                                                    //Get new Instance ID token
                                                    val token = task.result!!
                                                    FirebaseMessaging.getInstance()
                                                        .subscribeToTopic("test")
                                                    Log.d("Firebase", token)
                                                    appSetting.setFCMToken(token)
                                                    mainViewModel.sendFireBaseToken(token,it).observe(this){
                                                        var rootintent = Intent(this, rootActivty::class.java)
                                                        rootintent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
                                                        this.startActivity(rootintent)
                                                        Log.e("LoginAccount","카카오톡 로그인 완료")
                                                    }
                                                }
                                        }
                                    }
                                }
                            } else {
                                Log.i("Kakao Account","No Email Data")
                            }
                        }
                    }
                }
            } else {
                UserApiClient.instance.loginWithKakaoAccount(this, callback = callback)
            }
        }

        //구글 로그인 버튼
        google_login_button.setOnClickListener {
            val mGoogleSignInClient = GoogleSignIn.getClient(this,google_login.gso)
            var signIntent: Intent = mGoogleSignInClient.getSignInIntent()
            GoogleSignResultLauncher.launch(signIntent)
            CheckLogin(this@MainActivity).TotalLoginCheck()
        }


        //naver login callback 객체생성
        val oauthLoginCallback = naver_login.oauthLoginCallback

        //naver 로그인 버튼
        naver_login_button.setOnClickListener {
            NaverIdLoginSDK.authenticate(this,oauthLoginCallback)
        }
    }

    override fun onBackPressed() {
        //super.onBackPressed() 뒤로가기 버튼 막음
    }

    val callback: (OAuthToken?, Throwable?) -> Unit = { token, error ->
        if (error != null) {
        } else if (token != null) {
            UserApiClient.instance.me { user, error ->
                if(error != null){
                    Log.e("Kakao Account", "사용자 정보 요청 실패", error)
                } else if (user != null) {
                    Log.i("Kakao Account", "사용자 정보 요청 성공+ ${user.kakaoAccount?.email}")
                    if (user.kakaoAccount?.email.isNullOrEmpty()){}else{
                        Log.d("rootActivty",user.kakaoAccount?.email.toString())
                        val email = user.kakaoAccount?.email.toString()
                        mainViewModel.sendUserData("kakao",email).observe(this){
                            Log.d("appid",it)
                            if (it.isNotEmpty()){
                                appSetting.setAppid(it)

                                FirebaseMessaging.getInstance().token
                                    .addOnCompleteListener { task ->
                                        if (!task.isSuccessful) {
                                            Log.d("Firebase", "getInstanceId failed", task.exception)
                                            return@addOnCompleteListener
                                        }
                                        //Get new Instance ID token
                                        val token = task.result!!
                                        FirebaseMessaging.getInstance()
                                            .subscribeToTopic("test")
                                        Log.d("Firebase", token)
                                        appSetting.setFCMToken(token)

                                        mainViewModel.sendFireBaseToken(token,email).observe(this){
                                            Log.d("firbase",it)
                                            var rootintent = Intent(this, rootActivty::class.java)
                                            rootintent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
                                            this.startActivity(rootintent)
                                            Log.e("LoginAccount","카카오톡 로그인 완료")
                                        }
                                    }
                            }
                        }
                    }
                } else {
                    Log.i("Kakao Account","No Email Data")
                }
            }

        }
    }

    private fun initFirebase() {
        FirebaseMessaging.getInstance().token
            .addOnCompleteListener { task ->
                if (!task.isSuccessful) {
                    Log.d("Firebase", "getInstanceId failed", task.exception)
                    return@addOnCompleteListener
                }

                //Get new Instance ID token
                val token = task.result!!
                FirebaseMessaging.getInstance()
                    .subscribeToTopic("test")
                Log.d("Firebase", token)
                appSetting.setFCMToken(token)


            }
    }



}
