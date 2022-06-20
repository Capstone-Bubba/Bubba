package com.twogudak.bubba.Ui.CCTV

import android.net.Uri
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.twogudak.bubba.R
import android.widget.VideoView
import android.widget.MediaController
import com.twogudak.bubba.Ui.rootPage.rootActivty

class CCTV : Fragment() {
    lateinit var video:VideoView
    lateinit var mc:MediaController
    lateinit var rootActivty: rootActivty

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        rootActivty = context as rootActivty

        val v = inflater.inflate(R.layout.fragment_c_c_t_v, container, false)
        // Inflate the layout for this fragment
        video = v.findViewById(R.id.fragment_Cctv_VideoView)
        mc = MediaController(rootActivty)
        return v
    }

    override fun onStart() {
        super.onStart()

        val uri = Uri.parse("rtsp://1.228.75.116:8554/stream1")
        video.setMediaController(mc)
        video.setVideoURI(uri)
        video.start()
    }

}