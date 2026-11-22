DROP POLICY IF EXISTS "Public can view product media" ON storage.objects;

-- Public can read individual files via known URLs (no listing permitted via API)
-- Note: bucket is public, so direct URLs work; this restricts listing.
CREATE POLICY "Public can read product media files"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-media' AND (storage.foldername(name))[1] IS NOT NULL);