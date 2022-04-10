package com.twogudak.bubba

import android.content.Intent
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
import com.twogudak.bubba.Activity.*
import com.twogudak.bubba.SNSLogin.Google_Login
import com.twogudak.bubba.SNSLogin.Kakao_Login_class
import com.twogudak.bubba.SNSLogin.SNS_LOGINED_class
import kotlinx.coroutines.*
import okhttp3.internal.wait
import kotlin.coroutines.coroutineContext

class rootActivty : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_root_activty)

        val toolbar: Toolbar? = findViewById(R.id.root_toolbar)
        setSupportActionBar(toolbar)

        val drawerlayout = findViewById<DrawerLayout>(R.id.drawLayout)
        val rootmenu = findViewById<ImageButton>(R.id.root_menu)
        val navigationView = findViewById<NavigationView>(R.id.nav_view)
        com.twogudak.bubba.Menu.NavigationView(this).makenavigationView(navigationView,drawerlayout)

        rootmenu.setOnClickListener {
            drawerlayout.openDrawer(GravityCompat.START)
        }






    }

    override fun onBackPressed() {
        //super.onBackPressed() 뒤로가기 버튼 막음
    }


}