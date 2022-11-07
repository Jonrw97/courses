SELECT device.id, device.name, device.device_type, device.age
    FROM device, owners, people
    WHERE
    device.id = owners.device_id AND
    people.id = owners.owners_id AND
    people.age < 23 OR
    people.id  = 1;