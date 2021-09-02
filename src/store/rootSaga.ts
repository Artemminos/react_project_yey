import {spawn, all, call,} from "redux-saga/effects";

export default function* rootSaga() {
    const sagas: any[] = []

    // @ts-ignore
    const retrySagas = yield sagas.map(saga => {
        return spawn(function* () {

            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (e) {
                    console.log(e);
                }
            }
        })
    });
    yield all(retrySagas);
}
