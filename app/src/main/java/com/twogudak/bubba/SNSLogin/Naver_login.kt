package com.twogudak.bubba.SNSLogin

import android.content.Context
import android.util.Log
import android.widget.Toast
import com.navercorp.nid.NaverIdLoginSDK
import com.navercorp.nid.oauth.OAuthLoginCallback

class Naver_login(context: Context) {
    val context = context

    val oauthLoginCallback = object : OAuthLoginCallback {
        override fun onSuccess() {
            //네이버 로그인 성공
            val getAccessToken = NaverIdLoginSDK.getAccessToken()
            val getRefreshToken = NaverIdLoginSDK.getRefreshToken()
            Log.e("Naver Account", getAccessToken.toString())
            Log.e("Naver Account", getRefreshToken.toString())
        }

        override fun onFailure(httpStatus: Int, message: String) {
            val errorCode = NaverIdLoginSDK.getLastErrorCode().code
            val errorDescription = NaverIdLoginSDK.getLastErrorDescription()
            Toast.makeText(context,"errorCode:$errorCode, errorDesc:$errorDescription",
                Toast.LENGTH_SHORT).show()
        }

        override fun onError(errorCode: Int, message: String) {
            onFailure(errorCode, message)
        }
    }
}