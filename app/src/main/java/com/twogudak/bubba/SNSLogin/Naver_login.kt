package com.twogudak.bubba.SNSLogin

import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import com.navercorp.nid.NaverIdLoginSDK
import com.navercorp.nid.oauth.NidOAuthLogin
import com.navercorp.nid.oauth.OAuthLoginCallback
import com.navercorp.nid.profile.NidProfileCallback
import com.navercorp.nid.profile.data.NidProfileResponse
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.rootPage.rootActivty

class Naver_login(context: Context) {
    val context = context
    private val setting by lazy {
        ApplicationSetting(context)
    }

    val oauthLoginCallback = object : OAuthLoginCallback {
        override fun onSuccess() {
            //네이버 로그인 성공
            val getAccessToken = NaverIdLoginSDK.getAccessToken()
            val getRefreshToken = NaverIdLoginSDK.getRefreshToken()
            Log.e("Naver Account", "Naver AccessToken: " + getAccessToken.toString())
            Log.e("Naver Account", "Naver RefreshToken: " + getRefreshToken.toString())

            NidOAuthLogin().callProfileApi(object : NidProfileCallback<NidProfileResponse> {
                override fun onSuccess(response: NidProfileResponse) {
                    Log.d("Naver Profile",response.toString())
                    if (response.profile?.email.isNullOrEmpty()){}else{
                        setting.setEmail(response.profile?.email!!)
                    }
                }
                override fun onFailure(httpStatus: Int, message: String) {
                    val errorCode = NaverIdLoginSDK.getLastErrorCode().code

                }
                override fun onError(errorCode: Int, message: String) {
                    onFailure(errorCode, message)
                }
            })

            val rootintent = Intent(context, rootActivty::class.java)
            rootintent.putExtra("plateform","Naver")
            context.startActivity(rootintent)
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