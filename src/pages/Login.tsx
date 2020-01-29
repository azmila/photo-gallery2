import {
  IonContent, IonText, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, IonImg, IonToast
} from '@ionic/react';
import React, { Component } from 'react';
import './Login.css';
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";

const INITIAL_STATE = {

};

class Login extends Component {
  state: any = {};
  props: any = {};
  
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  async signIn(): Promise<void> {
    const { history } = this.props;

    try {
      const result = await Plugins.GoogleAuth.signIn();
      console.info('result', result);
      if (result) {
        history.push({
          pathname: '/home',
          state: { name: result.name || result.displayName, image: result.imageUrl, email: result.email }
        });
      }
     } catch (e) {
       console.log(e);
    //   <IonToast
    //     isOpen={true}
    //     message={e}
    //     duration={2000}
    //   />
     }
    //added later
    // else{
    //   history.push({
    //     pathname: '/home'
    //    });
    // }

  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Ionic React App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonCol className="text-center">
              <IonImg className="title-img" src="assets/capacitor.png" ></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="title">
                Google Login in Capacitor app
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="text-center">
              <IonText className="text-center">
                By Enappd Team
              </IonText>
            </IonCol>
          </IonRow>

          <IonButton className="login-button" onClick={() => this.signIn()} expand="block" fill="solid" color="danger">
            Login with Google
        </IonButton>
        </IonContent>
      </IonPage>
    )
  }
}

export default Login;