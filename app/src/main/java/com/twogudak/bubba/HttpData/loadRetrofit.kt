package com.twogudak.bubba.HttpData

import com.google.gson.GsonBuilder
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object loadRetrofit {

    var gson = GsonBuilder().setLenient().create()

    private val retrofitClient : Retrofit.Builder by  lazy {
        Retrofit.Builder()
            .baseUrl(DOMAIN.DOMAIN)
            .addConverterFactory(GsonConverterFactory.create(gson))
    }

    val OPEN_SERVICE: RetrofitInterface by lazy {
        retrofitClient.build().create(RetrofitInterface::class.java)!!
    }
}