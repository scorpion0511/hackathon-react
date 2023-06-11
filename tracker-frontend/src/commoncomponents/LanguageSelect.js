import i18n from "../lang/i18n";
import $ from "jquery";
const LanguageSelect = () =>
{
    const langs = [
    { id: "en", name: "English" }, { id: "it", name: "Italian" }, { id: "sp", name: "Spain" },
    { id: "ar", name: "Arabic" }];

    const ARABIC = 'ar';
    const changeLanguage = (event) =>
    {
      i18n.changeLanguage(event.target.value);
      if (event.target.value === ARABIC)
         $('body').attr('dir', 'rtl');
      else
        $('body').attr('dir', 'ltr');
    }

    return (<div className='control'>
       <select className="list" onChange={changeLanguage}>
          {langs.map((item, index) => (
             <option key={index} value={item.id}>
                {item.name}
             </option>
            ))}
       </select>
       </div>);
}; export default LanguageSelect;               