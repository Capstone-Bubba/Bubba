package com.twogudak.bubba.Ui.Home

import android.content.DialogInterface
import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.core.view.isVisible
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.mikephil.charting.charts.BarChart
import com.twogudak.bubba.R
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.MPAndroidGraph
import com.twogudak.bubba.Ui.dialog.register_dialog
import com.twogudak.bubba.Ui.rootPage.rootActivty
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList


class Home : Fragment(),DialogInterface.OnDismissListener {

    lateinit var rootActivty: rootActivty
    lateinit var sleepChart: BarChart
    lateinit var home_notification_recyceler: RecyclerView
    lateinit var babyName: TextView
    lateinit var babybirth: TextView
    lateinit var babyRegistBt: Button
    var babyimage : Bitmap? = null
    lateinit var babyThum : ImageButton

    var babyinfo = false
    val TAG = "home_fragment"
    var name:String? = ""
    var birthday:String? = ""


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_home, container, false)
        sleepChart = v.findViewById<BarChart>(R.id.home_sleep_chart)
        home_notification_recyceler = v.findViewById<RecyclerView>(R.id.home_notification_recycelview)
        babyName = v.findViewById(R.id.home_baby_name)
        babybirth = v.findViewById(R.id.home_baby_bith)
        babyRegistBt = v.findViewById(R.id.home_baby_infobt)
        babyThum = v.findViewById(R.id.home_baby_image)


        return v
    }

    override fun onStart() {
        super.onStart()
        Log.d(TAG,"home fragment onStart")
        rootActivty = context as rootActivty

        babyRegistBt.setOnClickListener {
            val manager = childFragmentManager
            Log.d(TAG,"아기 정보 등록 dialog Show")
            val dialog = register_dialog()
            dialog.show(manager, "register_dialog")
            manager.executePendingTransactions()
        }

        sleepChart?.let {
            val chartinit = MPAndroidGraph(rootActivty, ArrayList<Int>(), sleepChart)
            chartinit.sleepgraphinit()
        }
        var livemounth = 0
        val appSetting by lazy {
            ApplicationSetting(rootActivty)
        }

        val setting = appSetting.getSetting()
        name = setting["babyname"]
        birthday = setting["babybirth"]
        babyimage = appSetting.getBabyImg()
        Log.d(TAG,"return babyimage : ${babyimage}")



        if (name.isNullOrEmpty() and birthday.isNullOrEmpty()){
            babyinfo = false
        } else {
            babyinfo = true
            Log.d(TAG,"${name} ${birthday}")
            val dataformat = SimpleDateFormat("yyyyMMdd")
            val today = Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, 0)
                set(Calendar.MINUTE, 0)
                set(Calendar.SECOND, 0)
                set(Calendar.MILLISECOND, 0)
            }.time.time
            val start = dataformat.parse(birthday).time
            livemounth = (((today - start) / (24 * 60 * 60 * 1000))/30).toInt()

            if (babyimage != null ){
                babyThum.setImageBitmap(babyimage)
            } else {
                babyThum.setOnClickListener {
                    val manager = childFragmentManager
                    Log.d(TAG,"아기 정보 등록 dialog Show")
                    val dialog = register_dialog()
                    dialog.show(manager, "register_dialog")
                    manager.executePendingTransactions()
                }
            }
        }


        if (babyinfo) {
            babyName.text = name
            babybirth.text = "${livemounth} 개월"
            babyName.isVisible = true
            babybirth.isVisible = true
            babyRegistBt.isVisible = false
        } else {
            babyName.isVisible = false
            babybirth.isVisible = false
            babyRegistBt.isVisible = true
        }

        var timedata = ArrayList<String>()
        var titleData = ArrayList<String>()
        timedata.add("3월 11일 오후 10시 30분")
        timedata.add("3월 11일 오후 10시 31분")
        timedata.add("3월 11일 오후 10시 32분")
        titleData.add("아이가 울고 있음 불편함")
        titleData.add("아이가 울고 있음 아픔")
        titleData.add("아이가 울고 있음 화장실")

        val recyclerAdapter = Home_notification_recycelView(rootActivty,timedata,titleData)
        home_notification_recyceler.adapter = recyclerAdapter
        home_notification_recyceler.layoutManager = LinearLayoutManager(rootActivty)

    }


    override fun onDismiss(dialog: DialogInterface?) {
        onStart()
    }



}