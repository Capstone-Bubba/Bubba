package com.twogudak.bubba

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.navercorp.nid.NaverIdLoginSDK
import com.twogudak.bubba.SNSLogin.Kakao_Login_class
import com.twogudak.bubba.SNSLogin.SNS_LOGINED_class
import kotlinx.coroutines.*
import okhttp3.internal.wait

class rootActivty : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_root_activty)

        val kakao_Login = Kakao_Login_class(this)

        val kakaologout = findViewById<Button>(R.id.kakao_logout)
        val googlelogout = findViewById<Button>(R.id.google_logout)
        val naverlogout = findViewById<Button>(R.id.Naver_logout)


        kakaologout.setOnClickListener {
            kakao_Login.kakaologout()
            kakao_Login.kakao_login_state = SNS_LOGINED_class.nLogined
            finish()
        }


        googlelogout.setOnClickListener {
            finish()
        }

        naverlogout.setOnClickListener {
            NaverIdLoginSDK.logout()
            finish()
        }



    }

    override fun onBackPressed() {
        //super.onBackPressed() 뒤로가기 버튼 막음
    }
}