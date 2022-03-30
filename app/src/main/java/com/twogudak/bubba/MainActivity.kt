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
import com.navercorp.nid.oauth.OAuthLoginCallback
import com.navercorp.nid.oauth.view.NidOAuthLoginButton
import com.twogudak.bubba.SNSLogin.Google_Login
import com.twogudak.bubba.SNSLogin.Kakao_Login_class
import com.twogudak.bubba.SNSLogin.Naver_login

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
        Log.e("Hash",keyHash)

        NaverIdLoginSDK.initialize(this,BuildConfig.naver_ClientID,BuildConfig.naver_Client_Secret,"bubba")


        //로그인 버튼 id, size 설정
        val google_login_button = findViewById<SignInButton>(R.id.google_login_button)
        google_login_button.setSize(SignInButton.SIZE_WIDE)

        //kakao loginbt
        val kakao_login_button = findViewById<ImageButton>(R.id.kakao_login_button)
        val kakao_unlink_button = findViewById<Button>(R.id.kakao_login_unlink)
        val naver_login_button = findViewById<Button>(R.id.naver_login_button)

        //GoogleActivityResultLauncher 구현
        GoogleSignResultLauncher = registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()){ result ->
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(result.data)
            google_login.handleSignInResult(task)
        }

        //naver login callback
        val oauthLoginCallback = naver_login.oauthLoginCallback


        //setonClickListener 구현
        // 카카오톡이 설치되어 있으면 카카오톡으로 로그인, 아니면 카카오계정으로 로그인
        kakao_login_button.setOnClickListener {
                kakao_login.hasKakaoToken()
        }

        kakao_unlink_button.setOnClickListener {
            kakao_login.kakaounlink()
        }


        //구글 로그인 버튼
        google_login_button.setOnClickListener {
            val mGoogleSignInClient = GoogleSignIn.getClient(this,google_login.gso)
            var signIntent: Intent = mGoogleSignInClient.getSignInIntent()
            GoogleSignResultLauncher.launch(signIntent)
        }

        naver_login_button.setOnClickListener {
            NaverIdLoginSDK.authenticate(this,oauthLoginCallback)
        }





    }

    override fun onStart() {
        super.onStart()

        //구글 카카오 토큰 확인
        google_login.googleAccount()
        kakao_login.kakaoTokenCheck()

    }

}
