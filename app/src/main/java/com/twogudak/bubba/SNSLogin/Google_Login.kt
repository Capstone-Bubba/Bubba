package com.twogudak.bubba.SNSLogin

import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import com.twogudak.bubba.BuildConfig
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.rootPage.rootActivty

class Google_Login(context: Context) {

    val context = context
    val tag = "Google Account"


    private val setting by lazy {
        ApplicationSetting(context)
    }


    //Google 로그인이 되어 있는지 확인한다.
    //null을 반환하면 로그인을 안한것, 다른것을 반환하면 이미 앱에 로그인된 것

     fun googleAccount() {
        val account = GoogleSignIn.getLastSignedInAccount(context)
        if (account == null) {
            Log.e(tag, "로그인 안되있음")

        } else {
            Log.e(tag, "로그인 완료된 상태")

        }
    }

    //Google login

    //사용자의 ID, 이메일 주소 및 기본정보를 요청하도록 로그인 구성
    //프로파일링 합니다. ID 및 기본 프로파일은 DEFAULT_SIGN_IN에 포함됩니다.
    //추가로 요청해야하는 정보는 requestScopes를 지정하여 요청함. 꼭 필요한 것들만 요청하도록 한다.
    val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestIdToken(BuildConfig.google_debug)
        .requestServerAuthCode(BuildConfig.google_debug)
        .requestEmail()
        .build()


    fun handleSignInResult(completedTask: Task<GoogleSignInAccount>) {
        try {
            val account = completedTask.getResult(ApiException::class.java)
            val email = account?.email.toString()
            var googletoken = account?.idToken.toString()
            var googletokenAuth = account?.serverAuthCode.toString()

            Log.e(tag,email)
            Log.e(tag,googletoken)
            Log.e(tag, googletokenAuth)

            setting.setEmail(email)

            var rootintent = Intent(context, rootActivty::class.java)
            context.startActivity(rootintent)
        } catch (e: ApiException){
            Log.e(tag,"signInResult:failed Code = " + e.statusCode)
        }
    }
}