package com.twogudak.bubba.HttpData.DTO

import com.google.gson.annotations.SerializedName

data class AlarmInfoDTO(
    @SerializedName("result")
    var AlarmInfoDTO: ArrayList<AlarmDetail>)

data class AlarmDetail(
    @SerializedName("mfcc_result")
    var mfcc_result: String,
    @SerializedName("accur_time")
    var accur_time: String,
)
