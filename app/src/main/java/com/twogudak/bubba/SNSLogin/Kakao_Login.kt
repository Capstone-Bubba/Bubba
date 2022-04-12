package com.twogudak.bubba.SNSLogin

import android.content.Context
import android.content.Intent
import android.util.Log
import com.kakao.sdk.auth.AuthApiClient
import com.kakao.sdk.auth.model.OAuthToken
import com.kakao.sdk.common.model.ClientError
import com.kakao.sdk.common.model.ClientErrorCause
import com.kakao.sdk.common.model.KakaoSdkError
import com.kakao.sdk.user.UserApiClient
import com.twogudak.bubba.Ui.rootPage.rootActivty

class Kakao_Login_class(context: Context) {

    val context = context //mainactivty context
    val tag = "Kakao Account"


    //카카오톡 앱이 안깔려있을때 사용되는 callback 함수
    val callback: (OAuthToken?, Throwable?) -> Unit = { token, error ->
        if (error != null) {
            Log.e(tag, "카카오계정으로 로그인 실패", error)

        } else if (token != null) {
            Log.i(tag, "카카오계정으로 로그인 성공 ${token.accessToken}")
            var rootintent = Intent(context, rootActivty::class.java)
            context.startActivity(rootintent)
        }
    }

    //카카오톡 로그인 구현
    fun kakaoLogin() {
        // 카카오톡이 설치되어 있으면 카카오톡으로 로그인, 아니면 카카오계정으로 로그인
        if (UserApiClient.instance.isKakaoTalkLoginAvailable(context)) {
            UserApiClient.instance.loginWithKakaoTalk(context) { token, error ->
                if (error != null) {
                    Log.e(tag, "카카오톡으로 로그인 실패", error)

                    // 사용자가 카카오톡 설치 후 디바이스 권한 요청 화면에서 로그인을 취소한 경우,
                    // 의도적인 로그인 취소로 보고 카카오계정으로 로그인 시도 없이 로그인 취소로 처리 (예: 뒤로 가기)
                    if (error is ClientError && error.reason == ClientErrorCause.Cancelled) {
                        return@loginWithKakaoTalk
                    }

                    // 카카오톡에 연결된 카카오계정이 없는 경우, 카카오계정으로 로그인 시도
                    UserApiClient.instance.loginWithKakaoAccount(context, callback = callback)
                } else if (token != null) {
                    Log.i(tag, "카카오톡으로 로그인 성공 ${token.accessToken}")
                }
            }
        } else {
            Log.e("test","test")
            UserApiClient.instance.loginWithKakaoAccount(context, callback = callback)
        }
    }

    //kakao 토큰 유효성 검사
    fun hasKakaoToken(){
        if(AuthApiClient.instance.hasToken()){
            UserApiClient.instance.accessTokenInfo{ _, error ->
                if(error != null) {
                    if(error is KakaoSdkError && error.isInvalidTokenError() == true){
                        Log.e(tag, "카카오톡 로그인 필요", error)
                        kakaoLogin() //토큰 정보가 없음 로그인 구현
                    }
                    else {
                        //토큰 정보 불러오는대 오류가 발생함
                        Log.e(tag, "카카오톡 로그인확인 오류", error)

                    }
                }
                else {
                    //토큰이 있는것이 확인됨 토큰 정보를 출력함
                    Log.e(tag, "카카오톡 토큰이 이미 있음.", error)

                    kakaoTokeninfo()
                }
            }
        }
        else {
            Log.e(tag, "else 카카오톡 로그인 필요 ")
            kakaoLogin()
        }
    }

    suspend fun kakaoTokenCheck(){

        if(AuthApiClient.instance.hasToken()){
            Log.e(tag,"검사시작")
            UserApiClient.instance.accessTokenInfo{ _, error ->
                if(error != null) {
                    if(error is KakaoSdkError && error.isInvalidTokenError() == true){

                        Log.e(tag, "토큰이 없음", error)
                    }
                    else {
                        //토큰 정보 불러오는대 오류가 발생함
                        Log.e(tag, "토큰 불러오기 오류", error)

                    }
                }
                else {
                    //토큰이 있는것이 확인됨 토큰 정보를 출력함
                    Log.e(tag, "토큰이 있음.", error)

                    kakaoTokeninfo()
                }
            }

        }
        else {
            Log.e(tag, "토큰 없음 로그인 필요 ")


        }
    }

    //kakao 토큰 정보 보기
    fun kakaoTokeninfo(){
        UserApiClient.instance.accessTokenInfo{ tokenInfo, error ->
            if(error != null){
                Log.e(tag, "토큰 정보 보기 실패", error)
            }
            else if (tokenInfo != null) {
                Log.i(
                    tag, "토큰 정보 보기 성공" +
                        "\n회원번호: ${tokenInfo.id}" +
                        "\n만료시간: ${tokenInfo.expiresIn} 초")
            }
        }
    }

    fun kakaounlink(){
        UserApiClient.instance.unlink { error ->
            if(error != null){
                Log.e("kakao Account", "연결 끊기 실패",error)
            } else {
                Log.e("KaKao Account", "연결 끊기 성공 삭제됬음.")
            }
        }
    }

    fun kakaologout(){
        UserApiClient.instance.logout { error ->
            if(error != null){
                Log.e("Kakao Account","로그아웃 실패 . SDK에서 토큰삭제됨", error)
            } else {
                Log.i("Kakao Account","로그아웃 성공 . SDK에서 토큰 삭제됨")

            }
        }
    }

    fun kakaoloaduser(){
        UserApiClient.instance.me { user, error ->
            if(error != null){
                Log.e("Kakao Account", "사용자 정보 요청 실패", error)
            } else if (user != null) {
                Log.i("Kakao Account", "사용자 정보 요청 성공+ ${user.id}")
            } else {
                Log.i("Kakao Account","?")
            }
        }
    }
}