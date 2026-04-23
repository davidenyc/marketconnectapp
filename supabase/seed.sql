insert into public.vendors (
  id,
  user_id,
  name,
  slug,
  profile_photo_url,
  description,
  coverage_area,
  phone,
  is_active_today
) values
  (
    '11111111-1111-1111-1111-111111111111',
    null,
    'Isla Fresh Cart',
    'isla-fresh',
    null,
    'Mobile fruit cart serving the ferry road and nearby neighborhoods in the morning.',
    'Island ferry road',
    '+63 917 100 4001',
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    null,
    'Hanoi Green Basket',
    'hanoi-green-basket',
    null,
    'Neighborhood produce scooter with daily greens and quick updates from village suppliers.',
    'Ba Dinh district',
    '+84 93 555 2109',
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    null,
    'River Road Produce',
    'river-road-produce',
    null,
    'Rural roadside stall with roots, bananas, and market-day staples from nearby farms.',
    'River Road village',
    '+1 876 555 0193',
    false
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    null,
    'Coastal Harvest',
    'coastal-harvest',
    null,
    'Informal evening stand with vegetables sourced from inland growers and local gardens.',
    'Port road',
    '+1 758 555 8831',
    true
  )
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  coverage_area = excluded.coverage_area,
  phone = excluded.phone,
  is_active_today = excluded.is_active_today;

insert into public.vendor_locations (
  id,
  vendor_id,
  latitude,
  longitude,
  place_label,
  is_current,
  updated_at
) values
  (
    'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    '11111111-1111-1111-1111-111111111111',
    10.315700,
    123.885400,
    'Near ferry road entrance',
    true,
    '2026-04-22T08:00:00.000Z'
  ),
  (
    'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    '22222222-2222-2222-2222-222222222222',
    21.033800,
    105.814200,
    'Corner of Van Cao and Doi Can',
    true,
    '2026-04-22T06:45:00.000Z'
  ),
  (
    'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
    '33333333-3333-3333-3333-333333333333',
    18.017900,
    -76.809900,
    'Beside the yellow bus stop',
    true,
    '2026-04-21T17:10:00.000Z'
  ),
  (
    'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
    '44444444-4444-4444-4444-444444444444',
    13.909400,
    -60.978900,
    'Outside the community center',
    true,
    '2026-04-22T12:20:00.000Z'
  )
on conflict (id) do update set
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  place_label = excluded.place_label,
  is_current = excluded.is_current,
  updated_at = excluded.updated_at;

insert into public.products (
  id,
  vendor_id,
  name,
  price,
  quantity_available,
  unit,
  stock_status
) values
  (
    'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1',
    '11111111-1111-1111-1111-111111111111',
    'Mangoes',
    2.50,
    18,
    'each',
    'in_stock'
  ),
  (
    'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2',
    '22222222-2222-2222-2222-222222222222',
    'Bok choy',
    1.80,
    10,
    'bundle',
    'in_stock'
  ),
  (
    'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3',
    '22222222-2222-2222-2222-222222222222',
    'Tomatoes',
    1.20,
    4,
    'kg',
    'low_stock'
  ),
  (
    'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4',
    '33333333-3333-3333-3333-333333333333',
    'Bananas',
    0.90,
    24,
    'kg',
    'in_stock'
  ),
  (
    'bbbbbbb5-bbbb-bbbb-bbbb-bbbbbbbbbbb5',
    '33333333-3333-3333-3333-333333333333',
    'Cassava',
    1.40,
    0,
    'kg',
    'out_of_stock'
  ),
  (
    'bbbbbbb6-bbbb-bbbb-bbbb-bbbbbbbbbbb6',
    '44444444-4444-4444-4444-444444444444',
    'Red chilies',
    0.75,
    5,
    'bag',
    'low_stock'
  )
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  quantity_available = excluded.quantity_available,
  unit = excluded.unit,
  stock_status = excluded.stock_status;
