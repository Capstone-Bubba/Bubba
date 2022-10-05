package com.twogudak.bubba.Ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.navercorp.nid.NaverIdLoginSDK
import com.twogudak.bubba.BuildConfig
import com.twogudak.bubba.MainActivity
import com.twogudak.bubba.SNSLogin.CheckLogin
import kotlinx.coroutines.*

public class SplashActivity: AppCompatActivity() {



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        NaverIdLoginSDK.initialize(this,
            BuildConfig.naver_ClientID,
            BuildConfig.naver_Client_Secret,"bubba")

        var intent = Intent(this, MainActivity::class.java)
        var token : String? = null

        //token = NaverIdLoginSDK.getRefreshToken()

        Log.d("token", token.toString())
        CheckLogin(this@SplashActivity).TotalLoginCheck()

    }
}