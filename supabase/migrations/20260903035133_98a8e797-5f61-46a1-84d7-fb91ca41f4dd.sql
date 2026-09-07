ALTER TABLE public.booking_requests
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS phone text;

GRANT SELECT, UPDATE ON public.booking_requests TO authenticated;
GRANT SELECT ON public.enquiries TO authenticated;
GRANT SELECT ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.booking_requests TO service_role;
GRANT ALL ON public.enquiries TO service_role;
GRANT ALL ON public.newsletter_subscribers TO service_role;

CREATE POLICY "Owner can read booking requests" ON public.booking_requests
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'email') = 'sagwaisaac@gmail.com');

CREATE POLICY "Owner can update booking requests" ON public.booking_requests
  FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'sagwaisaac@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'sagwaisaac@gmail.com');

CREATE POLICY "Owner can read enquiries" ON public.enquiries
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'email') = 'sagwaisaac@gmail.com');

CREATE POLICY "Owner can read subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'email') = 'sagwaisaac@gmail.com');

CREATE OR REPLACE FUNCTION public.booked_ranges()
RETURNS TABLE (suite text, arrival date, departure date)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.suite, b.arrival, b.departure
  FROM public.booking_requests b
  WHERE b.status = 'confirmed'
    AND b.arrival IS NOT NULL
    AND b.departure IS NOT NULL
    AND b.departure >= CURRENT_DATE
$$;

GRANT EXECUTE ON FUNCTION public.booked_ranges() TO anon, authenticated;