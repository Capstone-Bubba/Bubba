package com.twogudak.bubba.Ui.Notice

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.twogudak.bubba.R
import com.twogudak.bubba.Ui.rootPage.rootActivty

class Notice : Fragment() {

    lateinit var rootActivty: rootActivty

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        rootActivty = context as rootActivty
        return inflater.inflate(R.layout.fragment_notice, container, false)
    }

    override fun onStart() {
        super.onStart()

        val recyclerView = rootActivty.findViewById<RecyclerView>(R.id.notice_recyclerView)


    }

}