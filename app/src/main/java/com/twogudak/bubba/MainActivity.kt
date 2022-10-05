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
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.common.SignInButton
import com.google.android.gms.tasks.Task
import com.kakao.sdk.common.util.Utility
import com.navercorp.nid.NaverIdLoginSDK
import com.twogudak.bubba.SNSLogin.*
import kotlinx.coroutines.*
import okhttp3.internal.wait
import kotlin.math.log

class MainActivity : AppCompatActivity() {

    //google_login_class
    private lateinit var GoogleSignResultLauncher:ActivityResultLauncher<Intent>

    //class 생성
    val google_login = Google_Login(this)
    val kakao_login = Kakao_Login_class(this)
    val naver_login = Naver_login(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

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
                kakao_login.hasKakaoToken()
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




}
