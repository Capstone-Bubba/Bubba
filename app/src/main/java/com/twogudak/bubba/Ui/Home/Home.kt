package com.twogudak.bubba.Ui.Home

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.mikephil.charting.charts.BarChart
import com.twogudak.bubba.R
import com.twogudak.bubba.Ui.MPAndroidGraph
import com.twogudak.bubba.Ui.rootPage.rootActivty


class Home : Fragment() {

    lateinit var rootActivty: rootActivty




    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        rootActivty = context as rootActivty
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onStart() {
        super.onStart()

        val sleepChart = rootActivty.findViewById<BarChart>(R.id.home_sleep_chart)
        val chartinit = MPAndroidGraph(rootActivty,ArrayList<Int>(),sleepChart)
        chartinit.sleepgraphinit()

        var timedata = ArrayList<String>()
        var titleData = ArrayList<String>()
        timedata.add("3월 11일 오후 10시 30분")
        timedata.add("3월 11일 오후 10시 31분")
        timedata.add("3월 11일 오후 10시 32분")
        titleData.add("아이가 울고 있음 불편함")
        titleData.add("아이가 울고 있음 아픔")
        titleData.add("아이가 울고 있음 화장실")


        val home_notification_recyceler = rootActivty.findViewById<RecyclerView>(R.id.home_notification_recycelview)
        val recyclerAdapter = Home_notification_recycelView(rootActivty,timedata,titleData)
        home_notification_recyceler.adapter = recyclerAdapter
        home_notification_recyceler.layoutManager = LinearLayoutManager(rootActivty)

    }


}