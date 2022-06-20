package com.twogudak.bubba.Ui.dialog

import android.Manifest.permission.CAMERA
import android.app.Activity
import android.app.DatePickerDialog
import android.app.Dialog
import android.content.DialogInterface
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.ImageDecoder
import android.net.Uri
import android.nfc.Tag
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.DialogFragment
import com.google.android.material.textfield.TextInputEditText
import com.twogudak.bubba.R
import com.twogudak.bubba.SaveDataManager.ApplicationSetting
import com.twogudak.bubba.Ui.Home.Home
import com.twogudak.bubba.Ui.rootPage.rootActivty
import java.util.*
import java.util.jar.Manifest

class register_dialog: DialogFragment() {
    lateinit var cancelbt: Button
    lateinit var registerbt: Button
    lateinit var babyname: TextInputEditText
    lateinit var babybirth: TextView
    lateinit var dateString: String
    lateinit var calendarbt: Button
    lateinit var rootActivty: rootActivty
    lateinit var babyImageView: ImageView
    lateinit var cameraBt : Button
    lateinit var galleryButton : Button
    private val REQUEST_IMAGE_CAPTURE = 2
    private val PICK_IMAGE = 111


    val TAG = "register_dialog"
    var birth = ""
    var name: String?  = ""
    private val Gallery = 3333



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        rootActivty = context as rootActivty
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.register_dialog,container, true)

        cancelbt = v.findViewById(R.id.register_dialog_cancle)
        registerbt = v.findViewById(R.id.register_dialog_regist)
        babyname = v.findViewById(R.id.register_dialog_babyname_textfield)
        babybirth = v.findViewById(R.id.register_dialog_date)
        calendarbt = v.findViewById(R.id.register_dialog_popcalendar)
        babyImageView = v.findViewById(R.id.register_dialog_babyImageView)
        cameraBt = v.findViewById(R.id.register_dialog_camera)
        galleryButton = v.findViewById(R.id.register_dialog_gallery)


        return v
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val appSetting by lazy {
            ApplicationSetting(rootActivty)
        }



        cancelbt.setOnClickListener { dismiss() }
        calendarbt.setOnClickListener {
            val cal = Calendar.getInstance()
            val dateSetListener = DatePickerDialog.OnDateSetListener{view, year, mounth, dayOfMounth ->
                dateString = "${year}년 ${mounth+1}월 ${dayOfMounth}일"
                var mounthstring = ""
                var daystring = ""
                if (mounth < 10){
                    mounthstring = "0${mounth}"
                } else {
                    mounthstring = "${mounth}"
                }
                if (dayOfMounth < 10) {
                    daystring = "0${dayOfMounth}"
                } else {
                    daystring = "${dayOfMounth}"
                }

                birth = "${year}${mounthstring}${daystring}"
                babybirth.text = dateString
                babybirth.setTextColor(Color.BLACK)
            }
            DatePickerDialog(rootActivty,dateSetListener, cal.get(Calendar.YEAR),cal.get(Calendar.MONTH),cal.get(Calendar.DAY_OF_MONTH)).show()
        }

        cameraBt.setOnClickListener {
            if (checkPermission()) {
                Log.d(TAG,"카메라를 실행합니다.")
                dispatchTakePictureIntent()
            } else {
                Log.d(TAG,"권한이 등록되어 있지 않음")
                requestPermission()
            }
        }

        galleryButton.setOnClickListener {
            if (checkPermission()) {
                Log.d(TAG,"갤러리를 실행합니다.")
                openGalerryForImage()
            } else {
                Log.d(TAG,"권한이 등록되어 있지 않음")
                requestPermission()
            }
        }



        registerbt.setOnClickListener {
            name = babyname.text?.toString()
            if (name.isNullOrEmpty()){
                Log.e(TAG,"이름 칸 비어있음")
                Toast.makeText(requireContext(),"아기 이름이 비어 있습니다.",Toast.LENGTH_SHORT).show()
            } else if (birth.isNullOrEmpty()){
                Log.e(TAG,"날짜 선택안함")
                Toast.makeText(requireContext(),"날짜를 선택해주세요.",Toast.LENGTH_SHORT).show()
            } else {
                appSetting.setBabyInfo(name.toString(),birth)
                if (babyImageView.getDrawable() != null){

                }
                Log.d(TAG,"아기이름, 아기 생일 셋팅완료 아기이름 : ${name}, 생일: ${birth}")
            }
            dismiss()
        }
    }

    override fun onDismiss(dialog: DialogInterface) {
        super.onDismiss(dialog)
        val fragment = parentFragment
        if(fragment is DialogInterface.OnDismissListener) {
            (fragment as DialogInterface.OnDismissListener).onDismiss(dialog)
        }
    }

    private fun requestPermission(){
        ActivityCompat.requestPermissions(rootActivty, arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE,CAMERA),1)
    }

    private fun checkPermission():Boolean{
        return (ContextCompat.checkSelfPermission(rootActivty,android.Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(rootActivty,
            android.Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED)
    }

    @Override
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if( requestCode == 1 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
            Toast.makeText(rootActivty, "권한 설정 OK", Toast.LENGTH_SHORT).show()
        }
        else
        {
            Toast.makeText(rootActivty, "권한 허용 안됨", Toast.LENGTH_SHORT).show()
        }
    }

    private fun dispatchTakePictureIntent() {
        Log.d(TAG,"이미지 캡쳐 실행")
        Intent(MediaStore.ACTION_IMAGE_CAPTURE).also { takePictureIntent ->
            takePictureIntent.resolveActivity(rootActivty.packageManager).also {
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
            }
        }
    }

    private fun openGalerryForImage() {
        val intent = Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        startActivityForResult(intent, Gallery)
    }

    @Override
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if( resultCode == Activity.RESULT_OK) {
            if (requestCode == Gallery) {
                var ImageData: Uri? = data?.data
                val decode = MediaStore.Images.Media.getBitmap(rootActivty.contentResolver, ImageData)
                babyImageView.setImageBitmap(decode)
            }
            else if( requestCode == REQUEST_IMAGE_CAPTURE)
            {
                val imageBitmap : Bitmap? = data?.extras?.get("data") as Bitmap
                babyImageView.setImageBitmap(imageBitmap)
            }
        }
    }


}