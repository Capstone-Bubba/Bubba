package com.twogudak.bubba.Activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.material.navigation.NavigationView
import com.kakao.sdk.user.UserApiClient
import com.navercorp.nid.NaverIdLoginSDK
import com.twogudak.bubba.R
import com.twogudak.bubba.SNSLogin.Google_Login
import com.twogudak.bubba.SNSLogin.Kakao_Login_class
import com.twogudak.bubba.SNSLogin.SNS_LOGINED_class
import kotlinx.coroutines.runBlocking

class Setting : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_setting)

        val toolbar: Toolbar? = findViewById(R.id.root_toolbar)
        setSupportActionBar(toolbar)

        val drawerlayout = findViewById<DrawerLayout>(R.id.setting_drawLayout)
        val rootmenu = findViewById<ImageButton>(R.id.root_menu)
        val navigationView = findViewById<NavigationView>(R.id.setting_nav_view)
        com.twogudak.bubba.Menu.NavigationView(this).makenavigationView(navigationView,drawerlayout)

        rootmenu.setOnClickListener {
            drawerlayout.openDrawer(GravityCompat.START)
        }

        val kakao_Login = Kakao_Login_class(this)
        val kakaologout = findViewById<Button>(R.id.kakao_logout)
        val googlelogout = findViewById<Button>(R.id.google_logout)
        val naverlogout = findViewById<Button>(R.id.Naver_logout)

        kakaologout.setOnClickListener {
            UserApiClient.instance.logout { error ->
                if(error != null){
                    Log.e("Kakao Account","로그아웃 실패 . SDK에서 토큰삭제됨", error)
                } else {
                    Log.i("Kakao Account","로그아웃 성공 . SDK에서 토큰 삭제됨")
                    kakao_Login.kakao_login_state = SNS_LOGINED_class.nLogined
                    Toast.makeText(this,"카카오톡 계정이 로그아웃 되었습니다.", Toast.LENGTH_SHORT).show()
                    finish()
                }
            }
        }

        var google_login = Google_Login(this)
        googlelogout.setOnClickListener {

            val mGoogleSignInClient = GoogleSignIn.getClient(this,google_login.gso)
            mGoogleSignInClient.signOut().addOnSuccessListener {
                finish()
            }

        }

        naverlogout.setOnClickListener {
            runBlocking { NaverIdLoginSDK.logout() }
            finish()
        }


    }

    override fun onBackPressed() {
        //super.onBackPressed() 뒤로가기 버튼 막음
    }
    override fun onPause() {
        super.onPause()

        overridePendingTransition(0, 0)
    }
}