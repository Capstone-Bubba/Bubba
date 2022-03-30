package com.twogudak.bubba

import android.content.ContentValues.TAG
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ImageButton
import android.widget.Toast
import com.google.android.gms.auth.api.identity.GetSignInIntentRequest
import com.google.android.gms.auth.api.identity.Identity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import com.kakao.sdk.auth.AuthApiClient
import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.common.KakaoSdk
import com.kakao.sdk.common.model.ClientError
import com.kakao.sdk.common.model.ClientErrorCause
import com.kakao.sdk.common.model.KakaoSdkError
import com.kakao.sdk.common.util.Utility
import com.kakao.sdk.user.UserApiClient
import com.twogudak.bubba.SNSLogin.Kakao_Login_class
import java.nio.file.AccessDeniedException

class MainActivity : AppCompatActivity() {
    val GOOGLE_SIGN_IN_CODE = 9444

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)



        //Android Hash값 얻어오기 Kakao api 사용
        var keyHash = Utility.getKeyHash(this)
        Log.e("Hash",keyHash)

        val kakao_login_button = findViewById<ImageButton>(R.id.kakao_login_button)
        val kakao_login = Kakao_Login_class(this)



        //로그인 버튼 id, size 설정
        val google_login_button = findViewById<SignInButton>(R.id.google_login_button)
        google_login_button.setSize(SignInButton.SIZE_WIDE)



        //setonClickListener 구현

        // 카카오톡이 설치되어 있으면 카카오톡으로 로그인, 아니면 카카오계정으로 로그인
        kakao_login_button.setOnClickListener {
            kakao_login.hasKakaoToken()
        }

        //구글 로그인 버튼
        google_login_button.setOnClickListener {
            googleSignIn()
        }

    }

    override fun onStart() {
        super.onStart()

        //Google 로그인이 되어 있는지 확인한다.
        //null을 반환하면 로그인을 안한것, 다른것을 반환하면 이미 앱에 로그인된 것
        val account = GoogleSignIn.getLastSignedInAccount(this)
        if(account == null){
            Log.e("Google account","로그인 안되있음")
        } else {
            Log.e("Google account","로그인 완료된 상태")
        }
    }

    //Google login

    //사용자의 ID, 이메일 주소 및 기본정보를 요청하도록 로그인 구성
    //프로파일링 합니다. ID 및 기본 프로파일은 DEFAULT_SIGN_IN에 포함됩니다.
    //추가로 요청해야하는 정보는 requestScopes를 지정하여 요청함. 꼭 필요한 것들만 요청하도록 한다.
    val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_GAMES_SIGN_IN)
        .requestEmail()
        .build()

    fun googleSignIn(){
        val mGoogleSignInClient = GoogleSignIn.getClient(this,gso)
        var signIntent: Intent = mGoogleSignInClient.getSignInIntent()

        startActivityForResult(signIntent,GOOGLE_SIGN_IN_CODE )
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        //GoogleSignInClient.getSignInIntent 에서 intent를 실행하면 결과가 반환된다.
        if(requestCode == GOOGLE_SIGN_IN_CODE){
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)
        }
    }

    fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account = completedTask.getResult(ApiException::class.java)
            val email = account?.email.toString()
            Log.d("Google account",email)
        } catch (e: ApiException){
            Log.e("Google account","signInResult:failed Code = " + e.statusCode)
        }
    }

}
