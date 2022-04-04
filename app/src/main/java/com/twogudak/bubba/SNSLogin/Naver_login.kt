package com.twogudak.bubba.SNSLogin

import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import com.navercorp.nid.NaverIdLoginSDK
import com.navercorp.nid.oauth.OAuthLoginCallback
import com.twogudak.bubba.rootActivty

class Naver_login(context: Context) {
    val context = context

    val tag = "Naver Account"
    var Naver_Logined_state  = SNS_LOGINED_class.nLogined

    val oauthLoginCallback = object : OAuthLoginCallback {
        override fun onSuccess() {
            //네이버 로그인 성공
            val getAccessToken = NaverIdLoginSDK.getAccessToken()
            val getRefreshToken = NaverIdLoginSDK.getRefreshToken()
            Log.e("Naver Account", "Naver AccessToken: " + getAccessToken.toString())
            Log.e("Naver Account", "Naver RefreshToken: " + getRefreshToken.toString())
            Naver_Logined_state = SNS_LOGINED_class.logined

            val rootintent = Intent(context,rootActivty::class.java)
            context.startActivity(rootintent)
        }

        override fun onFailure(httpStatus: Int, message: String) {
            val errorCode = NaverIdLoginSDK.getLastErrorCode().code
            val errorDescription = NaverIdLoginSDK.getLastErrorDescription()
            Naver_Logined_state  = SNS_LOGINED_class.nLogined
            Toast.makeText(context,"errorCode:$errorCode, errorDesc:$errorDescription",
                Toast.LENGTH_SHORT).show()
        }

        override fun onError(errorCode: Int, message: String) {
            onFailure(errorCode, message)
           Naver_Logined_state  = SNS_LOGINED_class.nLogined
        }
    }

    suspend fun CheckToken(){
        val AccessToken = NaverIdLoginSDK.getAccessToken()
        val RefreshToken = NaverIdLoginSDK.getRefreshToken()
        val TokenInfo = NaverIdLoginSDK.getTokenType()

        Log.e(tag,AccessToken.toString())
        Log.e(tag,RefreshToken.toString())
        Log.e(tag,TokenInfo.toString())

        if(RefreshToken == null){
            Log.e(tag,"Naver Login 안되있음")
            Naver_Logined_state  = SNS_LOGINED_class.nLogined

        }else if (RefreshToken != null){
            Naver_Logined_state  = SNS_LOGINED_class.logined
        }
    }
}