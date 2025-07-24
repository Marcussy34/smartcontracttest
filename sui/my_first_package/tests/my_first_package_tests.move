module my_first_package::my_first_package_tests;

#[test]
fun test_sword_create() {
    // Create a dummy TxContext for testing
    let mut ctx = tx_context::dummy();

    // Create a sword using the public constructor
    let sword = my_first_package::example::new_sword(42, 7, &mut ctx);

    // Check if accessor functions return correct values
    assert!(sword.magic() == 42 && sword.strength() == 7, 1);

    let dummy_address = @0xCAFE;
    transfer::public_transfer(sword, dummy_address);
}