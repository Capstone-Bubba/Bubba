package com.twogudak.bubba.HttpData

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object loadRetrofit {

    private val retrofitClient : Retrofit.Builder by  lazy {
        Retrofit.Builder()
            .baseUrl(DOMAIN.DOMAIN)
            .addConverterFactory(GsonConverterFactory.create())
    }

    val OPEN_SERVICE: RetrofitInterface by lazy {
        retrofitClient.build().create(RetrofitInterface::class.java)!!
    }
}