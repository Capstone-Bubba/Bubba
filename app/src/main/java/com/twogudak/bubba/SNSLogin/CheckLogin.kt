package com.twogudak.bubba.SNSLogin

import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.kakao.sdk.auth.AuthApiClient
import com.kakao.sdk.user.UserApiClient
import com.navercorp.nid.NaverIdLoginSDK
import com.twogudak.bubba.MainActivity
import com.twogudak.bubba.Ui.rootPage.rootActivty


class CheckLogin(context: Context) {
    val context = context
    var plateform = ""

    fun kakaologinCheck() {
        if (AuthApiClient.instance.hasToken()) {
            UserApiClient.instance.accessTokenInfo { _, error ->
                if (error == null) {
                    //카카오 통신 갱신, 토큰이 있는것이 확인됨 토큰 정보를 출력함
                    var rootintent = Intent(context, rootActivty::class.java)
                    rootintent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
                    plateform = "Kakao"
                    rootintent.putExtra("plateform",plateform)
                    context.startActivity(rootintent)
                    Log.e("LoginAccount","카카오톡 로그인 완료")
                } else {
                    Log.e("LoginAccount","카카오톡 로그인 안되있음.")
                    val mainIntent = Intent(context, MainActivity::class.java)
                    context.startActivity(mainIntent)
                }
            }
        } else {
            Log.e("LoginAccount","카카오 로그인 안되있음.")
            val mainIntent = Intent(context, MainActivity::class.java)
            context.startActivity(mainIntent)
        }


    }//loginCheck

    fun googleAccount() {
        val account = GoogleSignIn.getLastSignedInAccount(context)
        if (account != null) {
            //구글 로그인 완료된 상태
            var rootintent = Intent(context, rootActivty::class.java)
            rootintent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
            plateform = "Google"
            rootintent.putExtra("plateform",plateform)
            context.startActivity(rootintent)

        } else{
            Log.e("Login Account","Google 로그인 안되 있음.")
            kakaologinCheck()

        }
    }//google Account


    fun TotalLoginCheck(){


        val token = NaverIdLoginSDK.getRefreshToken()

        if(token == null){
            Log.e("Login Check","Naver Login 안되있음")
            googleAccount()

        }else if (token != null){
            Log.e("Login Check","Naver Login 되어있음 ${token}")
            plateform = "Naver"
            var rootintent = Intent(context, rootActivty::class.java)
            rootintent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
            rootintent.putExtra("plateform",plateform)
            context.startActivity(rootintent)
        }
    } //naver토큰 체크


}


