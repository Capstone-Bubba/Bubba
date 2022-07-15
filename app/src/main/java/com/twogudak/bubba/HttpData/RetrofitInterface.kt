package com.twogudak.bubba.HttpData

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface RetrofitInterface {
    @POST("/auth/app/kakao/callback")
    fun SendToken(@Body Token : HashMap<String,String>): Call<String>

    @POST("")
    fun SendFireBaseToken(@Body Token : HashMap<String,String>) : Call<String>
}