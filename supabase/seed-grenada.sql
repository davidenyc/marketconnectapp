insert into public.markets (
  id,
  name,
  slug,
  description,
  place_label,
  latitude,
  longitude,
  open_time,
  close_time,
  open_days,
  featured_items
) values
  (
    '90000000-0000-0000-0000-000000000001',
    'St. George''s Market',
    'st-georges-market',
    'The capital''s main produce market for ground provisions, spices, fruit, and daily kitchen shopping.',
    'St. George''s Market Square, St. George''s, Grenada',
    12.052700,
    -61.748400,
    '6:00 AM',
    '4:00 PM',
    array['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    array['dasheen', 'scotch bonnet peppers', 'cocoa', 'breadfruit']
  ),
  (
    '90000000-0000-0000-0000-000000000002',
    'Grand Anse Farmers Market',
    'grand-anse-farmers-market',
    'A beach-road produce market serving Grand Anse shoppers, hotel workers, and families picking up fruit and spices.',
    'Grand Anse Beach Road, Grand Anse, Grenada',
    12.017200,
    -61.761800,
    '7:00 AM',
    '2:00 PM',
    array['Wednesday', 'Friday', 'Saturday'],
    array['nutmeg', 'soursop', 'plantain', 'scotch bonnet peppers']
  ),
  (
    '90000000-0000-0000-0000-000000000003',
    'Grenville Weekend Market',
    'grenville-weekend-market',
    'An east coast weekend market for plantain, christophene, breadfruit, cocoa, and village-grown produce.',
    'Grenville Market, Grenville, St. Andrew, Grenada',
    12.123200,
    -61.624300,
    '6:30 AM',
    '1:30 PM',
    array['Friday', 'Saturday', 'Sunday'],
    array['plantain', 'christophene', 'breadfruit', 'cocoa']
  )
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  place_label = excluded.place_label,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  open_time = excluded.open_time,
  close_time = excluded.close_time,
  open_days = excluded.open_days,
  featured_items = excluded.featured_items;

insert into public.vendors (
  id,
  user_id,
  market_id,
  name,
  slug,
  profile_photo_url,
  description,
  coverage_area,
  phone,
  is_active_today
) values
  (
    '91000000-0000-0000-0000-000000000001',
    null,
    '90000000-0000-0000-0000-000000000002',
    'Grand Anse Spice Table',
    'grand-anse-spice-table',
    null,
    'Beach road table with fresh fruit, nutmeg, and easy lime for families heading back from Grand Anse.',
    'Grand Anse Beach Road',
    '+1 473 415 2104',
    true
  ),
  (
    '91000000-0000-0000-0000-000000000002',
    null,
    '90000000-0000-0000-0000-000000000001',
    'Market Square Ground Foods',
    'market-square-ground-foods',
    null,
    'Morning stall in St. George''s with market chatter, solid ground provisions, and quick bundles for home cooks.',
    'St. George''s Market Square',
    '+1 473 420 1186',
    true
  ),
  (
    '91000000-0000-0000-0000-000000000003',
    null,
    '90000000-0000-0000-0000-000000000003',
    'Gouyave Cocoa Corner',
    'gouyave-cocoa-corner',
    null,
    'West coast vendor near the nutmeg works with cocoa, breadfruit, and village staples from St. John''s growers.',
    'Gouyave Nutmeg Processing area',
    '+1 473 442 3072',
    true
  ),
  (
    '91000000-0000-0000-0000-000000000004',
    null,
    '90000000-0000-0000-0000-000000000003',
    'Grenville Market Basket',
    'grenville-market-basket',
    null,
    'East coast market stand stacking plantain, christophene, and roots for early weekend shoppers.',
    'Grenville Market',
    '+1 473 458 3341',
    true
  ),
  (
    '91000000-0000-0000-0000-000000000005',
    null,
    '90000000-0000-0000-0000-000000000001',
    'Carenage Harbour Fruits',
    'carenage-harbour-fruits',
    null,
    'Harbour-side produce setup for office workers, ferry crews, and passersby on the Carenage.',
    'The Carenage',
    '+1 473 439 5520',
    false
  ),
  (
    '91000000-0000-0000-0000-000000000006',
    null,
    '90000000-0000-0000-0000-000000000002',
    'Bay Garden Produce',
    'bay-garden-produce',
    null,
    'Roadside produce stop just off Grand Anse with island peppers, plantain, and quick pick-up bags for supper.',
    'Grand Anse Beach Road',
    '+1 473 444 2809',
    true
  )
on conflict (id) do update set
  market_id = excluded.market_id,
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
    '92000000-0000-0000-0000-000000000001',
    '91000000-0000-0000-0000-000000000001',
    12.017800,
    -61.762500,
    'Grand Anse Beach Road near the craft stalls',
    true,
    '2026-04-23T08:10:00.000Z'
  ),
  (
    '92000000-0000-0000-0000-000000000002',
    '91000000-0000-0000-0000-000000000002',
    12.052600,
    -61.748600,
    'St. George''s Market Square by the produce arcade',
    true,
    '2026-04-23T06:55:00.000Z'
  ),
  (
    '92000000-0000-0000-0000-000000000003',
    '91000000-0000-0000-0000-000000000003',
    12.164900,
    -61.729200,
    'Near Gouyave Nutmeg Processing Station',
    true,
    '2026-04-23T09:25:00.000Z'
  ),
  (
    '92000000-0000-0000-0000-000000000004',
    '91000000-0000-0000-0000-000000000004',
    12.122600,
    -61.624700,
    'Grenville Market main produce lane',
    true,
    '2026-04-23T07:40:00.000Z'
  ),
  (
    '92000000-0000-0000-0000-000000000005',
    '91000000-0000-0000-0000-000000000005',
    12.052100,
    -61.751200,
    'The Carenage near the harbour walk',
    true,
    '2026-04-22T16:35:00.000Z'
  ),
  (
    '92000000-0000-0000-0000-000000000006',
    '91000000-0000-0000-0000-000000000006',
    12.016300,
    -61.760900,
    'Grand Anse Beach Road by the Morne Rouge turnoff',
    true,
    '2026-04-23T11:20:00.000Z'
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
    '93000000-0000-0000-0000-000000000001',
    '91000000-0000-0000-0000-000000000001',
    'Nutmeg',
    6.50,
    14,
    'bag',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000002',
    '91000000-0000-0000-0000-000000000001',
    'Soursop',
    8.00,
    5,
    'each',
    'low_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000003',
    '91000000-0000-0000-0000-000000000002',
    'Dasheen',
    4.25,
    16,
    'kg',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000004',
    '91000000-0000-0000-0000-000000000002',
    'Scotch bonnet peppers',
    2.75,
    8,
    'bag',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000005',
    '91000000-0000-0000-0000-000000000003',
    'Cocoa',
    9.50,
    11,
    'bag',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000006',
    '91000000-0000-0000-0000-000000000003',
    'Breadfruit',
    7.00,
    4,
    'each',
    'low_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000007',
    '91000000-0000-0000-0000-000000000004',
    'Plantain',
    3.50,
    22,
    'kg',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000008',
    '91000000-0000-0000-0000-000000000004',
    'Christophene',
    2.25,
    9,
    'kg',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000009',
    '91000000-0000-0000-0000-000000000005',
    'Soursop',
    7.50,
    6,
    'each',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000010',
    '91000000-0000-0000-0000-000000000005',
    'Nutmeg',
    5.75,
    12,
    'bag',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000011',
    '91000000-0000-0000-0000-000000000006',
    'Plantain',
    3.25,
    18,
    'kg',
    'in_stock'
  ),
  (
    '93000000-0000-0000-0000-000000000012',
    '91000000-0000-0000-0000-000000000006',
    'Scotch bonnet peppers',
    3.00,
    3,
    'bag',
    'low_stock'
  )
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  quantity_available = excluded.quantity_available,
  unit = excluded.unit,
  stock_status = excluded.stock_status;
