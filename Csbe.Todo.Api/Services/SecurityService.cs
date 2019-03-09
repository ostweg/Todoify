using System.Security.Cryptography;
using System;
using System.Text;

namespace Csbe.Todo.Api.Services
{
    public static class SecurityService
    {
        //auth
        public static bool CanAuthenticate(byte[] userPassword, byte[] storedPassword)
        {
            for(int i = 0; i < userPassword.Length; i++)
            {
                if (userPassword[i] != storedPassword[i]) return false;
            }
            return true;
        }    

        //Hash method
        public static byte[] HashPasswordwithSalt(byte[] plainPw){
            byte[] pwBytes = plainPw;
            var salt = GetSalt();
            var mergeBytes = new byte[pwBytes.Length + salt.Length];
            Array.Copy(pwBytes,mergeBytes,pwBytes.Length);
            Array.Copy(salt, 0,mergeBytes,pwBytes.Length, salt.Length);

            byte[] hash;
            using(var sha = SHA256.Create()){
                hash = sha.ComputeHash(mergeBytes);
            }
            return hash;
        }              
        public static byte[] GetSalt()
        {
            byte[] salt = new byte[16];
            return salt;
        }
    }        
}
