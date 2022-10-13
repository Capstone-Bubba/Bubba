package com.twogudak.bubba.HttpData.DTO

import com.google.gson.annotations.SerializedName

data class BabyInfoDTO(
    @SerializedName("result")
    var BabyInfoDTO: ArrayList<BabyDetail>)


data class BabyDetail(
    @SerializedName("baby_num")
    var baby_num: Int,
    @SerializedName("baby_name")
    var baby_name: String,
    @SerializedName("gender")
    var gender: Int,
    @SerializedName("baby_picure")
    var baby_picutre: Int,
    @SerializedName("birth")
    var birth: String,
)