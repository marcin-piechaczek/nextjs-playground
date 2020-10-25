import { i18n } from '../../lib/i18n';
import {useDispatch, useSelector} from "react-redux";
import {getAppConfig} from "~/store/reducers/root/app";
import {appTypes, setAppLang} from "~/store/actions/root/app";

const Language = () => {
    // const dispatch = useDispatch();
    // const { language } = useSelector(getAppConfig);

    // useEffect(() => {
    //   dispatch(fetchAppConfigAction());
    // }, [i18n.language]);

    const handleLangChange = (event) => {
        i18n.changeLanguage(event.target.value);
        // dispatch({ type: appTypes.SET_APP_LANGUAGE, data: event.target.value });
    }

    return (
        <select name="lang" value={i18n.language} onChange={(event) => handleLangChange(event)}>
            <option value="pl">PL</option>
            <option value="en">EN</option>
        </select>
    );
};

export default Language;
