package com.twogudak.bubba.Ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.kakao.sdk.auth.AuthApiClient
import com.kakao.sdk.user.UserApiClient
import com.navercorp.nid.NaverIdLoginSDK
import com.twogudak.bubba.BuildConfig
import com.twogudak.bubba.MainActivity
import com.twogudak.bubba.SNSLogin.CheckLogin
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.rootPage.rootActivty
import com.twogudak.bubba.Ui.rootPage.rootViewModel
import kotlinx.coroutines.*

public class SplashActivity: AppCompatActivity() {

    var plateform = ""
    private val appSetting by lazy {
        ApplicationSetting(this)
    }
    private lateinit var splashViewModel: SplashViewModel



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val setting = appSetting.getSetting()

        NaverIdLoginSDK.initialize(this,
            BuildConfig.naver_ClientID,
            BuildConfig.naver_Client_Secret,"bubba")

        splashViewModel = ViewModelProvider(this).get(SplashViewModel::class.java)

        if (AuthApiClient.instance.hasToken()) {
            UserApiClient.instance.accessTokenInfo { _, error ->
                if (error == null) {
                    //카카오 통신 갱신, 토큰이 있는것이 확인됨 토큰 정보를 출력함
                    UserApiClient.instance.me { user, error ->
                        if(error != null){
                            Log.e("Kakao Account", "사용자 정보 요청 실패", error)
                        } else if (user != null) {
                            Log.i("Kakao Account", "사용자 정보 요청 성공+ ${user.kakaoAccount?.email}")
                            if (user.kakaoAccount?.email.isNullOrEmpty()){}else{
                                Log.d("rootActivty",user.kakaoAccount?.email.toString())
                                val email = user.kakaoAccount?.email.toString()
                                splashViewModel.sendUserData("kakao",email).observe(this){
                                    Log.d("appid",it)
                                    if (it.isNotEmpty()){
                                        appSetting.setAppid(it)
                                        var rootintent = Intent(this, rootActivty::class.java)
                                        rootintent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
                                        this.startActivity(rootintent)
                                        Log.e("LoginAccount","카카오톡 로그인 완료")
                                    }
                                }
                            }
                        } else {
                            Log.i("Kakao Account","No Email Data")
                        }
                    }

                } else {
                    Log.e("LoginAccount","카카오톡 로그인 안되있음.")
                    val mainIntent = Intent(this, MainActivity::class.java)
                    this.startActivity(mainIntent)
                }
            }
        } else {
            Log.e("LoginAccount","카카오 로그인 안되있음.")
            val mainIntent = Intent(this, MainActivity::class.java)
            this.startActivity(mainIntent)
        }

    }//loginCheck

}