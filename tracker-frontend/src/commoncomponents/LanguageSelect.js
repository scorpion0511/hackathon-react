import i18n from "../lang/i18n";
const LanguageSelect = () =>
{
            const langs = [
            { id: "en", name: "English" },
            { id: "it", name: "Italian" },
            { id: "sp", name: "Spain" }];
            const changeLanguage = (event) =>
            {
              i18n.changeLanguage(event.target.value);
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
}
export default LanguageSelect;               