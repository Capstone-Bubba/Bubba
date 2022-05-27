package com.twogudak.bubba.SaveDataManager

import android.content.Context
import android.content.SharedPreferences

class ApplicationSetting(context: Context) {

    var appSetting: SharedPreferences = context.getSharedPreferences("setting", Context.MODE_PRIVATE)
    var editor = appSetting.edit()

    fun setFirstCheck(first: Boolean):Boolean{
        editor.putString("first",first.toString())
        return editor.commit()
    }

    fun setFCMToken(fcm:String):Boolean {
        editor.putString("fcm",fcm)
        return editor.commit()
    }

    fun getSetting():HashMap<String, String>{
        var setting = HashMap<String, String>()
        setting["first"] = appSetting.getString("first", "true").toString()
        setting["fcm"] = appSetting.getString("fcm", "").toString()
        setting["uuid"] = appSetting.getString("uuid", "").toString()
        setting["babyname"] = appSetting.getString("babyname","").toString()
        setting["babybirth"] = appSetting.getString("babybirth","").toString()
        return setting
    }

    fun setBabyInfo(babyname:String, babybirth:String):Boolean {
        editor.putString("babyname",babyname)
        editor.putString("babybirth", babybirth)
        return editor.commit()
    }

}