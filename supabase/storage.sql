insert into storage.buckets (id, name, public)
values ('vendor-photos', 'vendor-photos', true)
on conflict (id) do nothing;

drop policy if exists "Public can view vendor photos" on storage.objects;
drop policy if exists "Authenticated users can upload vendor photos" on storage.objects;
drop policy if exists "Authenticated users can update vendor photos" on storage.objects;
drop policy if exists "Authenticated users can delete vendor photos" on storage.objects;

create policy "Public can view vendor photos"
on storage.objects for select
using (bucket_id = 'vendor-photos');

create policy "Authenticated users can upload vendor photos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'vendor-photos');

create policy "Authenticated users can update vendor photos"
on storage.objects for update
to authenticated
using (bucket_id = 'vendor-photos');

create policy "Authenticated users can delete vendor photos"
on storage.objects for delete
to authenticated
using (bucket_id = 'vendor-photos');
