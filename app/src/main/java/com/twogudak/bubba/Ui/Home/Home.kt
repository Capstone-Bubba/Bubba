package com.twogudak.bubba.Ui.Home

import android.content.*
import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.core.view.isVisible
import androidx.lifecycle.ViewModelProvider
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.mikephil.charting.charts.BarChart
import com.twogudak.bubba.R
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.MPAndroidGraph
import com.twogudak.bubba.Ui.dialog.register_dialog
import com.twogudak.bubba.Ui.rootPage.rootActivty
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*
import kotlin.collections.ArrayList


class Home : Fragment(),DialogInterface.OnDismissListener {

    lateinit var rootActivty: rootActivty
    lateinit var sleepChart: BarChart
    lateinit var home_notification_recyceler: RecyclerView
    lateinit var babyName: TextView
    lateinit var babybirth: TextView
    lateinit var babyThum : ImageButton
    private lateinit var  homeviewModel: HomeViewModel
    val TAG = "home_fragment"




    val BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            Log.d(TAG,"Update recycelView")


            
        }
    }



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        rootActivty = context as rootActivty
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_home, container, false)
        sleepChart = v.findViewById<BarChart>(R.id.home_sleep_chart)
        home_notification_recyceler = v.findViewById<RecyclerView>(R.id.home_notification_recycelview)
        babyName = v.findViewById(R.id.home_baby_name)
        babybirth = v.findViewById(R.id.home_baby_bith)
        babyThum = v.findViewById(R.id.home_baby_image)
        homeviewModel = ViewModelProvider(rootActivty).get(HomeViewModel::class.java)


        return v
    }

    override fun onStart() {
        super.onStart()
        Log.d(TAG,"home fragment onStart")


        LocalBroadcastManager.getInstance(rootActivty).registerReceiver(BroadcastReceiver,
            IntentFilter("notification Message")
        )

        val bundle = arguments
        val email = bundle?.getString("email")
        val appid = bundle?.getString("appid")


        sleepChart?.let {
            val chartinit = MPAndroidGraph(rootActivty, ArrayList<Int>(), sleepChart)
            chartinit.sleepgraphinit()
        }
        var livemounth = 0
        val appSetting by lazy {
            ApplicationSetting(rootActivty)
        }
        Log.d(TAG,appid.toString())
        homeviewModel.BabyInfoCall(appid!!.toInt()).observe(viewLifecycleOwner){
            babyName.text = it.BabyInfoDTO[0].baby_name
            val start = LocalDateTime.parse(it.BabyInfoDTO[0].birth.toString(), DateTimeFormatter.ISO_DATE_TIME)
            val startDate = start.format(DateTimeFormatter.ofPattern("MM월dd일"))
            babybirth.text = startDate
        }
        homeviewModel.getmessage().observe(viewLifecycleOwner){
            Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
        }

        homeviewModel.AlarminfoCall(appid!!.toInt()).observe(viewLifecycleOwner){
            Log.d(TAG,it.toString())
        }

        homeviewModel.getmessageAlarmInfo().observe(viewLifecycleOwner){
            Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
        }



        var timedata = ArrayList<String>()
        var titleData = ArrayList<String>()
        timedata.add("3월 11일 오후 10시 30분")
        timedata.add("3월 11일 오후 10시 31분")
        timedata.add("3월 11일 오후 10시 32분")
        titleData.add("아이가 울고 있음 불편함")
        titleData.add("아이가 울고 있음 아픔")
        titleData.add("아이가 울고 있음 화장실")
        timedata.add("3월 11일 오후 10시 30분")
        titleData.add("아이가 울고 있음 불편함")


        val recyclerAdapter = Home_notification_recycelView(rootActivty,timedata,titleData)
        home_notification_recyceler.adapter = recyclerAdapter
        home_notification_recyceler.layoutManager = LinearLayoutManager(rootActivty)

    }

    override fun onDestroy() {
        super.onDestroy()
        LocalBroadcastManager.getInstance(rootActivty).unregisterReceiver(BroadcastReceiver)
    }


    override fun onDismiss(dialog: DialogInterface?) {
        onStart()
    }



}