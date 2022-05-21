import firebase from '~/plugins/firebase'

export default async function ({ redirect }) {
  await new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        return redirect('/login')
      }
      resolve()
    })
  })
}