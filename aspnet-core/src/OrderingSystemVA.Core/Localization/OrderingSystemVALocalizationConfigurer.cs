using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace OrderingSystemVA.Localization
{
    public static class OrderingSystemVALocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(OrderingSystemVAConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(OrderingSystemVALocalizationConfigurer).GetAssembly(),
                        "OrderingSystemVA.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
