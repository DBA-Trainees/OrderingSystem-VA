using OrderingSystemVA.Debugging;

namespace OrderingSystemVA
{
    public class OrderingSystemVAConsts
    {
        public const string LocalizationSourceName = "OrderingSystemVA";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "887a4244993c43acb771157f13eb6c95";
    }
}
