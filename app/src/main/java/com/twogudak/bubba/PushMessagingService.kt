package com.twogudak.bubba


import android.app.AlertDialog
import android.app.PendingIntent
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.os.Handler
import android.os.HandlerThread
import android.os.Looper
import android.os.Vibrator
import android.util.Log
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.twogudak.bubba.Ui.dialog.AlertDialogActivity
import com.twogudak.bubba.Ui.rootPage.rootActivty

class PushMessagingService : FirebaseMessagingService() {

    private lateinit var vibrator: Vibrator
    private val pattern = longArrayOf(100, 200, 100, 200, 100, 200)

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d("Refresh Token push notification",token)
    }

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d("FCM","From:${message.from}")

        val intent = Intent("notification Message")
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent)

        if(message.data.isNotEmpty()){
            Log.d("FCM","data: ${message.data}")
        }

        message.notification?.let {
            Log.d("FCM", "Message Notification Body: ${it.body}")
        }
        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        vibrator.vibrate(pattern, 0)
        var handler = Handler(Looper.getMainLooper()).post {
            var AlertDialogIntent = Intent(applicationContext, AlertDialogActivity::class.java)
            var pendingIntent = PendingIntent.getActivity(applicationContext,0,AlertDialogIntent,0)
            try {
                pendingIntent.send()
            } catch (e: PendingIntent.CanceledException) {
                Log.e("PushMessagingService",e.toString())
            }
        }
        handler

    }

    override fun onDeletedMessages() {
        super.onDeletedMessages()

        Log.d("Refresh Token push notification","DeletedMessages")
    }
}

