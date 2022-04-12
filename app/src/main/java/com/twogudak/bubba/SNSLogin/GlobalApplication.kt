package com.twogudak.bubba.SNSLogin

import android.app.Application
import com.kakao.sdk.common.KakaoSdk
import com.twogudak.bubba.BuildConfig

class GlobalApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        KakaoSdk.init(this,"${BuildConfig.KaKao_appkey}")
    }
}