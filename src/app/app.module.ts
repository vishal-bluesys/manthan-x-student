import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera  } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { Network } from '@ionic-native/network';
import { CacheModule } from "ionic-cache";
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { AppRate } from '@ionic-native/app-rate';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { RegistrationPage } from '../pages/registration/registration';
import { Registration2Page } from '../pages/registration2/registration2';
import { PostedjobsPage } from '../pages/postedjobs/postedjobs';
import { PostjobPage } from '../pages/postjob/postjob';
import { PostdetailsPage } from '../pages/postdetails/postdetails';
import { NewpostPage } from '../pages/newpost/newpost';
import { FriendsprofilePage } from '../pages/friendsprofile/friendsprofile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';

import { HomePage } from '../pages/home/home';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { CoursesPage } from '../pages/courses/courses';
import { FriendsPage } from '../pages/friends/friends';
import { ProfilePage } from '../pages/profile/profile';
import { CoursedetailsPage } from '../pages/coursedetails/coursedetails';
import { JobdetailsPage } from '../pages/jobdetails/jobdetails';
import { YoutubePage } from '../pages/youtube/youtube';
import { PlaylistPage } from '../pages/playlist/playlist';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { TimelinePage } from '../pages/timeline/timeline';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomeComponent } from '../components/welcome/welcome';
import { RestProvider } from '../providers/rest/rest';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
import { YoutubeProvider } from '../providers/youtube/youtube';
import { ParallaxDirective } from '../directives/parallax/parallax';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    RegistrationPage,
    Registration2Page,
    LoginPage,
    HomePage,
    ListPage,
    FriendsPage,
    ProfilePage,
    CoursesPage,
    CoursedetailsPage,
    JobdetailsPage,
    AboutusPage,
    ContactusPage,
    PostedjobsPage,
    PostjobPage,
    NewpostPage,
    PostdetailsPage,
    FriendsprofilePage,
    YoutubePage,
    PlaylistPage,
    PortfolioPage,
    TimelinePage,
    ChangepasswordPage,
    ForgotpasswordPage,
    WelcomeComponent,
    NotificationsPage,
    ParallaxDirective ],

  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
     CacheModule.forRoot(),
    IonicStorageModule.forRoot({ 
    name: '__mydb',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAc3OJjmNS4_9ozEZb0sVtJgdZSelLO3fg'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    RegistrationPage,
    Registration2Page,
    LoginPage,
    HomePage,
    ListPage,
    FriendsPage,
    ProfilePage,
    CoursesPage,
    CoursedetailsPage,
    JobdetailsPage,
    AboutusPage,
    ContactusPage,
    PostedjobsPage,
    PostjobPage,
    NewpostPage,
    FriendsprofilePage,
    PostdetailsPage,
    YoutubePage,
    PlaylistPage,
    PortfolioPage,
    TimelinePage,
    ChangepasswordPage,
    ForgotpasswordPage,
    NotificationsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    FileTransfer,
    File,
    RestProvider,
    FCM,
    Device,
    CallNumber,
    EmailComposer,
    Network,
    YoutubeProvider,
    YoutubeVideoPlayer,
    AppRate,


  ]
})
export class AppModule {}
