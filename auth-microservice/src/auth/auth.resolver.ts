import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
    @Query(() => String)
    witajSwiecie() {
        return 'Lorem Ipsum ZGlkbnQgZXhwZWN0IHRoYXQgaWYgaSBkb250IHNldCByYW0gYWxsb2NhdGlvbiBsaW1pdCBpbiB3c2wncyBjb25maWcgZmlsZSB3aGljaCBkaWRudCBldmVuIGV4aXN0IG9uZSBkb2NrZXIncyBjb250YWluZXIgd291bGQgdXNlIDEwZ2Igb2YgcmFtIGNhc3VpbmcgbXkgcGMgKGFuZCBteSBtZW50YWwpIGNyYXNoaW5n';
    }
}