unsigned long loop()
{
   unsigned long sum = 0;
   unsigned long n = 10000;
   unsigned long i;

   for (i = 1; i <= n; i++)
   {
      sum += i;
   }

   return sum;
}