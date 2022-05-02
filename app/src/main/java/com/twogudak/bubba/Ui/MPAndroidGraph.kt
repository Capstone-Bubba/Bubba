package com.twogudak.bubba.Ui

import android.content.Context
import android.util.Log
import androidx.core.content.ContextCompat
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.components.AxisBase
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.github.mikephil.charting.formatter.ValueFormatter
import com.github.mikephil.charting.interfaces.datasets.IBarDataSet
import com.twogudak.bubba.R
import kotlin.math.log

class MPAndroidGraph(context: Context, data: ArrayList<Int>, barchart: BarChart) {
    private val context = context
    private val barchart = barchart
    private val data = data

    fun sleepgraphinit(){
        barchart.setTouchEnabled(false)

        data.add(10)
        data.add(5)
        data.add(3)
        data.add(7)
        data.add(9)
        data.add(21)
        data.add(23)

        val entries = ArrayList<BarEntry>()
        var x = 0.0f
        for (i in data){
            val floatData = i.toFloat()
            entries.add(BarEntry(x,floatData))
            x += 1.0f
        }

        barchart.run {
            description.isEnabled = false
            setMaxVisibleValueCount(7)
            setPinchZoom(false)
            setDrawGridBackground(false)
            axisRight.isEnabled = false
            axisLeft.run {
                axisMaximum = 24f
                axisMinimum = 0f
                granularity = 4f
                setDrawLabels(true)
                setDrawAxisLine(true)
                textSize = 14f
            }
            xAxis.run {
                position = XAxis.XAxisPosition.BOTTOM
                valueFormatter = MyXaXisFormatter()
                granularity = 1f
                setDrawLabels(true)
                setDrawAxisLine(true)
                setDrawGridLines(false)
                textSize = 15f
                animateY(1000)
                legend.isEnabled = true
            }
        }

        var set = BarDataSet(entries,"요일")
        set.color = ContextCompat.getColor(context,R.color.main)
        val dataset : ArrayList<IBarDataSet> = ArrayList()
        dataset.add(set)
        val data = BarData(dataset)
        data.barWidth = 0.5f

        barchart.run {
            this.data = data
            setFitBars(true)
            invalidate()
        }
    }

    inner class MyXaXisFormatter : ValueFormatter() {

        private val days = arrayOf("월","화","수","목","금","토","일")
        override fun getAxisLabel(value: Float, axis: AxisBase?): String {
            return days.getOrNull(value.toInt() ) ?: value.toString()
        }
    }


}