import AddressCollection from "../model/addressModel.js";
import UserCollection from "../model/userModel.js";

export const saveUserDetails = async (req, res, next) => {
  const { userDetails } = req.body;
  const { fullName, street, city, state, country, zipCode } = userDetails;

  if (!fullName || !street || !city || !state || !country || !zipCode) {
    const inputError = {
      status: 400,
      message: "Invalid input!",
      extradetails: "Please enter the input fields correctly.",
    };
    return next(inputError);
  }

  if (!zipCode.match(/^\d{6}$/)) {
    const zipCodeError = {
      status: 400,
      message: "Invalid zip code",
      extraDetails: "Please enter the valid zip code",
    };
    return next(zipCodeError);
  }

  try {
    //NOTE: Check if the user with same name is already present or not
    let user = await UserCollection.findOne({ fullName });

    //NOTE: Create a new Address
    const address = new AddressCollection({
      street,
      city,
      state,
      country,
      zipCode,
    });

    //NOTE: If user exists and the new address to the user's addresses array
    if (user) {
      const sameAddress = await AddressCollection.find({
        user: user._id,
        street,
        city,
        state,
        country,
        zipCode,
      });

      if (sameAddress.length > 0) {
        const sameAddressError = {
          status: 400,
          message: "Address already exists.",
          extraDetails: "Duplicate address found!",
        };
        return next(sameAddressError);
      } else {
        address.user = user._id; //NOTE: userId store in address object
        await address.save();

        user.addresses.push(address._id); //NOTE: addressId store in user object
        await user.save();

        res.status(201).json({
          success: true,
          message: "New address added to existing user",
          user,
        });
      }
    } else {
      //NOTE: If user doesn't exist, create a new one and save the address
      user = new UserCollection({ fullName });
      await user.save();

      address.user = user._id;
      await address.save();

      user.addresses.push(address._id);
      await user.save();

      res.status(201).json({
        success: true,
        message: "New user and address saved successfully",
        user,
      });
    }
  } catch (error) {
    return next(error);
  }
};
