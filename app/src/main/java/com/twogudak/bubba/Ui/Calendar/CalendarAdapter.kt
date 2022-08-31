package com.twogudak.bubba.Ui.Calendar

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.ColorRes
import androidx.recyclerview.widget.RecyclerView
import com.twogudak.bubba.HttpData.DTO.CalendarDTO
import com.twogudak.bubba.HttpData.DTO.CalendarDetail
import com.twogudak.bubba.R
import java.time.LocalDateTime



class CalendarAdapter(var context: Context) : RecyclerView.Adapter<CalendarAdapter.CalendarViewHolder>() {

    val calendarData = mutableListOf<CalendarDetail>()

    override fun getItemCount(): Int {
        return  calendarData.size
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CalendarViewHolder {
        val itemView = LayoutInflater.from(context).inflate(R.layout.calendar_list_item,parent, false)
        val holder = CalendarViewHolder(itemView)
        itemView.setOnClickListener(holder)

        return holder
    }

    override fun onBindViewHolder(holder: CalendarViewHolder, position: Int) {

        holder.dataText.text = "${calendarData[position].calendar_title}"
        holder.eventText.text = "${calendarData[position].calendar_content}"

    }



    inner class CalendarViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
        val dataText = itemView.findViewById<TextView>(R.id.calendar_item_time)
        val eventText = itemView.findViewById<TextView>(R.id.calendar_item_EventText)

        override fun onClick(p0: View?) {
            Log.d("CalendarAdapterView", "Click Calendar Item")
        }

    }
}