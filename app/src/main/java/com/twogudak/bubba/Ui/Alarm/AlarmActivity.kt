package com.twogudak.bubba.Ui.Alarm

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageButton
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.twogudak.bubba.R

class AlarmActivity : AppCompatActivity() {

    val data = ArrayList<String>()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_alarm)
        overridePendingTransition(R.anim.horizon_in,R.anim.none)

        val cancelbt = findViewById<ImageButton>(R.id.alarm_cancelBt)
        cancelbt.setOnClickListener {
            finish()
            overridePendingTransition(R.anim.none,R.anim.horizon_exit_right)
        }

        data.add("아이가 울고 있습니다.")
        data.add("아이가 울고 있습니다1.")
        data.add("아이가 울고 있습니다2.")
        data.add("아이가 울고 있습니다3.")
        data.add("아이가 울고 있습니다4.")


        val alarmRecyclerView = findViewById<RecyclerView>(R.id.alarm_recyclerView)
        val adapter = AlarmAdapter(this,data)
        alarmRecyclerView.adapter = adapter
        alarmRecyclerView.layoutManager = LinearLayoutManager(this)

    }
}