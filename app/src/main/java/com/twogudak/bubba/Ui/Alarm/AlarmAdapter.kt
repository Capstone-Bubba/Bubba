package com.twogudak.bubba.Ui.Alarm

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.twogudak.bubba.R

class AlarmAdapter(var context: Context,var data: ArrayList<String>): RecyclerView.Adapter<AlarmAdapter.ViewHolderClass>() {

    override fun getItemCount(): Int {
        return data.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolderClass {
        val itemView = LayoutInflater.from(context).inflate(R.layout.alarm_activity_row,parent,false)
        val holder = ViewHolderClass(itemView)
        itemView.setOnClickListener(holder)

        return holder
    }

    override fun onBindViewHolder(holder: ViewHolderClass, position: Int) {
        holder.alarm_title.text = data[position]
    }



    inner class ViewHolderClass(itemView: View): RecyclerView.ViewHolder(itemView), View.OnClickListener{

        val classification = itemView.findViewById<TextView>(R.id.classification)
        val alarm_time = itemView.findViewById<TextView>(R.id.alarm_time)
        val alarm_title = itemView.findViewById<TextView>(R.id.alarm_title)
        val alarm_aiText = itemView.findViewById<TextView>(R.id.alarm_ai_text)

        override fun onClick(p0: View?) {
            Log.d("Alarm","${adapterPosition}")
        }
    }

}