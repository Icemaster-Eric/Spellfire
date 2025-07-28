fn main() {
    println!("cargo::rerun-if-changed=../protobuf");
    protobuf_codegen::Codegen::new()
        .includes(&["../protobuf"])
        .input("../protobuf/client_packet.proto")
        .input("../protobuf/server_packet.proto")
        .input("../protobuf/types.proto")
        .input("../protobuf/mage.proto")
        .out_dir("./src/protobuf_codegen")
        .run_from_script();
}
