const express = require( 'express' );
const familyModel = require( '../Model/familyModel' );
const fs = require( 'fs' );
const { error } = require('console');


// create new family profile
const createProfile = async ( req, res ) => {
    const {fatherName,motherName,children } = req.body;
    const profile = new familyModel( {
        fatherName,
        motherName,
        children,
        childrenImage: req.files[ "childrenImage" ][ 0 ].filename,
    } );
    try {
        const savedProfile = await profile.save();
        if ( savedProfile ) {
            res.status( 201 ).json( {
                message: "Profile saved successfully",
                data: savedProfile
            })
        } else {
            res.status( 400 ).json( {
                message: "Could not create profile"
            })
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}

const getProfiles = async ( req, res ) => {
    try {
        const profiles = await familyModel.find();
        if ( profiles.length === 0 ) {
            res.status( 400 ).json( {
                message: "No profile is available"
            })
        } else {
            res.status( 200 ).json( {
                message: "All profiles",
                data: profiles,
                totalProfiles: profiles.length
            })
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}

const getProfile = async ( req, res ) => {
    try {
        const profileId = req.params.id;
        const profile = await familyModel.findById( profileId );
        if ( !profile ) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile
            })
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}

const updateProfile = async (req, res) => {
  const profileId = req.params.id;
  const profile = await familyModel.findById( profileId );
  try {
    const {fatherName,motherName,children} = req.body;
    const updateFields = {
      fatherName: fatherName || profile.fatherName,
      motherName: motherName|| profile.motherName,
      children: children || profile.children,
      childrenImage: profile.childrenImage,
      };

    // check if the profileImage is to be updated
    if (req.files && req.files["childrenImage"]) {
      const oldChildrenImagePath = `uploads/${profile.childrenImage}`;
      // Delete the old image if it exists
      if (fs.existsSync(oldChildrenImagePath)) {
        fs.unlinkSync(oldChildrenImagePath);
      }
      updateFields.childrenImage = req.files.childrenImage[0].filename;
    }

    const updatedProfile = await familyModel.findByIdAndUpdate(
      profileId,
      updateFields,
      { new: true }
      );
      console.log(updatedProfile)
    if (updatedProfile) {
      res.status(200).json({
        message: 'Updated successfully',
        data: updatedProfile,
      });
    } else {
      res.status(404).json({
        message: 'Profile not found.',
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Delete a particular profile
const deleteProfile = async (req, res) => {
  const profileId = req.params.id;
  try {
    const profile = await familyModel.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found.',
      });
    }
    const childrenImagePath = `uploads/${profile.childrenImage}`;
    if (fs.existsSync(childrenImagePath)) {
      fs.unlinkSync(childrenImagePath);
    }
    await familyModel.findByIdAndDelete(profileId);
    res.status(200).json({
      message: 'Profile deleted successfully',
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
    createProfile,
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile
}

